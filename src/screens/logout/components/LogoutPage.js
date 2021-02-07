import { set } from "../../../shared/helpers/localStorage"
export default function LogoutPage() {
  set("isLoggedIn", "false")
  document.location = "/settings/login"
}
