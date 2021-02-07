import { set } from "../../functions/localStorage"
export default function LogoutPage() {
  set("isLoggedIn", "false")
  document.location = "/settings/login"
}
