import { Route, Routes } from 'react-router-dom'

import { AppLayout } from './components/layout/layout'
import { AccountPage } from './components/pages/AccountPage'
import { ForgotPasswordPage } from './components/pages/ForgotPasswordPage'
import { HomePage } from './components/pages/HomePage'
import { LoginPage } from './components/pages/LoginPage'
import { ResetPasswordPage } from './components/pages/ResetPasswordPage'
import { SignupPage } from './components/pages/SignupPage'
import { UserProfilePage } from './components/pages/UserProfilePage'
import { VerifyEmailPage } from './components/pages/VerifyEmailPage'

export const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="konto" element={<AccountPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="users/:username" element={<UserProfilePage />} />
      </Route>
    </Routes>
  )
}