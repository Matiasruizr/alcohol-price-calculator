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
        this.createCategoryTable();
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
    const productsTable: string = "CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30) NOT NULL, net_value INTEGER NOT NULL, category VARCHAR(30) NOT NULL);";
    return this.database?.executeSql(productsTable, [])
      .then(res => console.log('Tabla creada ', res))
      .catch(e => console.log('error creando la tabla', e));
  }

  async createCategoryTable() {
    // Table category must have id, name, tax (can be a decimal), position and margin (can be a decimal)
    const categoryTable: string = "CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30) NOT NULL, tax DECIMAL NOT NULL, position INTEGER NOT NULL, margin DECIMAL NOT NULL);";
    return this.database?.executeSql(categoryTable, [])
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
  async createProduct(id: number, name: string, net_value: number, category: string) {
    let data = [id, name, net_value, category];
    return this.database?.executeSql('INSERT INTO products(id, name, net_value, category) VALUES (?, ?, ?, ?)', data)
      .then(res => {
        console.log(res);
      });
  }

  // Generar una función que permita actualizar un producto
  async updateProduct(id: number, name: string, net_value: number, category: string) {
    let data = [name, net_value, category, id];
    return this.database?.executeSql('UPDATE products SET name = ?, net_value = ?, category = ? WHERE id = ?', data)
      .then(res => {
        console.log(res);
      });
  }

  // Generar una función que permita eliminar un producto
  async deleteProduct(id: number) {
    return this.database?.executeSql('DELETE FROM products WHERE id = ?', [id])
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
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
            net_value: res.rows.item(i).net_value,
            category: res.rows.item(i).category,
          });
          console.log("Producto: " + res.rows.item(i).name + " id: " + res.rows.item(i).id);
        }
      }
      return items;
    });
  }
  
  async findProduct(id: number) {
    return this.database?.executeSql('SELECT * FROM products WHERE id = ?', [id])
      .then(res => {
        if (res.rows.length > 0) {
          return {
            id: res.rows.item(0).id,
            name: res.rows.item(0).name,
            net_value: res.rows.item(0).net_value,
            category: res.rows.item(0).category,
          }
        } else {
          return null;
        }
      });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  async findCategories() {
    return this.database?.executeSql('SELECT * FROM categories', []).then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
            tax: res.rows.item(i).tax,
            position: res.rows.item(i).position,
            margin: res.rows.item(i).margin,
          });
          console.log("Categoria: " + res.rows.item(i).name + " id: " + res.rows.item(i).id);
        }
      }
      return items;
    });
  }
}
