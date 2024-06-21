import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbTaskService {
  public database?: SQLiteObject;
 
  listSessions = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private sqlite: SQLite, private platform: Platform) {
    console.log("DB Service initialized")
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'sessions.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        console.log("DB created");
        this.database = db;
        this.createSessionTable();
        this.createProductsTable();
        this.registerSession("los3", 123456);
        this.isDbReady.next(true);
      }).catch(e => console.log("error creating db", e));
    })
  }

  //  Genera las tablas necesarias para el funcionamiento de la sesion. 
  async createSessionTable() {
    const sessionTable: string = "CREATE TABLE IF NOT EXISTS session_data(user_name VARCHAR(8) PRIMARY KEY NOT NULL, password INTEGER NOT NULL, active INTEGER NOT NULL);";
    return this.database?.executeSql(sessionTable, [])
      .then(res => console.log('Tabla creada ', res))
      .catch(e => console.log('error creando la tabla', e));
  }

  //  Genera las tablas necesarias para el funcionamiento de la sesion. 
  async createProductsTable() {
    const productsTable: string = "CREATE TABLE IF NOT EXISTS products(sku VARCHAR(12) PRIMARY KEY NOT NULL, name VARCHAR(30) NOT NULL, net_value INTEGER NOT NULL, category VARCHAR(30) NOT NULL);";
    return this.database?.executeSql(productsTable, [])
      .then(res => console.log('Tabla creada ', res))
      .catch(e => console.log('error creando la tabla', e));
  }


  // Consulta si existe alguna sesión activa.
  async activeSessionExists() {
    return this.database?.executeSql('SELECT * FROM session_data WHERE active = 1', [])
      .then(res => {
        if (res.rows.length > 0) {
          return true;
        } else {
          return false;
        }
      });
  }

  // Valida la existencia de un usuario que inicia sesión. 
  async validateUser(user_name: string, password: number | null) {
    return this.database?.executeSql('SELECT * FROM session_data WHERE user_name = ? AND password = ?', [user_name, password])
      .then(res => {
        if (res.rows.length > 0) {
          return true;
        } else {
          return false;
        }
      });
  }

  // Generar una función que permita el registro de una sesión. 
  async registerSession(user_name: string, password: number) {
    let data = [user_name, password, 0];
    return this.database?.executeSql('INSERT INTO session_data(user_name, password, active) VALUES (?, ?, ?)', data)
      .then(res => {
        console.log(res);
      });
  }

  // Generar una función que permita actualizar el estado de active de una sesión.
  async updateSession(user_name: string, active: number) {
    let data=[active, user_name];
    return this.database?.executeSql('UPDATE session_data SET active = ? WHERE user_name = ?', data)
    .then(res =>{
      console.log(res)
    })
  }

  // Consulta una sesion
  async findSession(user_name: string) {
    return this.database?.executeSql('SELECT * FROM session_data WHERE user_name = ?', [user_name])
      .then(res => {
        if (res.rows.length > 0) {
          console.log(
            "Usuario", {
              username: res.rows.item(0).username,
              active: res.rows.item(0).active,
            }
          )
          return {
            username: res.rows.item(0).username,
            active: res.rows.item(0).active,
          }
        } else {
          return null;
        }
      });
  }

  // Elimina una sesion
  async deleteSession(user_name: string) {
    return this.database?.executeSql('DELETE FROM session_data WHERE user_name = ?', [user_name])
      .then(res => {
        console.log(res);
      });
  }

  // Generar una función que permita crear un producto
  async createProduct(sku: string, name: string, net_value: number, category: string) {
    let data = [sku, name, net_value, category];
    return this.database?.executeSql('INSERT INTO products(sku, name, net_value, category) VALUES (?, ?, ?, ?)', data)
      .then(res => {
        console.log(res);
      });
  }

  // Generar una función que permita actualizar un producto
  async updateProduct(sku: string, name: string, net_value: number, category: string) {
    let data = [name, net_value, category, sku];
    return this.database?.executeSql('UPDATE products SET name = ?, net_value = ?, category = ? WHERE sku = ?', data)
      .then(res => {
        console.log(res);
      });
  }

  // Generar una función que permita eliminar un producto
  async deleteProduct(sku: string) {
    return this.database?.executeSql('DELETE FROM products WHERE sku = ?', [sku])
      .then(res => {
        console.log(res);
      });
  }

  // Generar una función que permita consultar todos los productos.
  async findProducts() {
    return this.database?.executeSql('SELECT * FROM products', []).then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            sku: res.rows.item(i).sku,
            name: res.rows.item(i).name,
            net_value: res.rows.item(i).net_value,
            category: res.rows.item(i).category,
          });
          console.log("Producto: " + res.rows.item(i).name + " SKU: " + res.rows.item(i).sku);
        }
      }
      return items;
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchNoticias(): Observable<any> {
    return this.listSessions.asObservable();
  }
}
