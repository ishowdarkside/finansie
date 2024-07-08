export default function LoginPanel(): JSX.Element {
  return (
    <div>
      <h3>Login to get started</h3>
      <form>
        <input type="email" placeholder="Email here" />
        <input type="password" placeholder="Password here" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
