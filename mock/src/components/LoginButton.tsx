import { Dispatch, SetStateAction } from 'react';

/**
 * The props for the LoginButton function. It includes an isLoggedIn boolean that 
 * indicates whether the user is logged in and a setter for isLoggedIn
 */
interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

/**
 * Controls the login button of the site, such that when logged in, the user is able 
 * to input command but, when logged in, is unable to input any commands
 * @param props thee props of the login button. Read loginProps for more information.
 * @returns a Javascript element that controls the login button of the site
 */
export function LoginButton(props: loginProps) {

  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    )
  } else {
    return (
      <button aria-label='Login' onClick={authenticate}>Login</button>
    )
  }
}