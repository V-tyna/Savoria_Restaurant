import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { LoginErrors } from '../models/loginErrors';

export const loginAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const errors: LoginErrors = {};

  if (typeof email !== "string" || !email.includes("@")) {
    errors.email =
      "That doesn't look like an email address";
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }

  console.log('User was successfully logged in.', { email, password });

  // otherwise create the user and redirect
  //await createUser(email, password);
  // const resp = await fetch('http://localhost:4200/admin/login', {
  //   method: 'POST',
  //   headers: { 'Content-type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // });
  // console.log('RESP: ', await resp.json())
  return redirect('/admin/dashboard');
}