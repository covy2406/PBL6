function ErrorPage() {
  const customStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Để căn giữa theo chiều dọc
    flexDirection: 'column',
    textTransform: 'uppercase',
  }
  return (
    <div style={customStyle}>
      <h1>404</h1>
      <h2>Page not found</h2>
    </div>
  );
}
export default ErrorPage;
