import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const session = localStorage.getItem('active_session');
  console.log(session);
  // Validar si la sesion esta iniciada consulanto en localStorage
  if (session === 'si') {
    return true;
  }
  alert("Solo puedes acceder con sesion iniciada")
  return false;
};
