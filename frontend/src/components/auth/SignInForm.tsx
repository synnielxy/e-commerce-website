import { Input } from "@/components/ui/input";  
import { Button } from "@/components/ui/button";

export default function SignInForm() {
  return (
    <div>
      <h1>Sign In</h1>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button>Sign In</Button>
    </div>
  );
}
