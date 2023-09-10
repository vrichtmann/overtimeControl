import Login from "./pages/login";
import Home from "./pages/home";
import { loginStore } from "./hooks/loginStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const { logged } = loginStore();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="h-screen w-screen bg-gradient-to-b md:bg-gradient-to-r  from-cyan-800 from-20% via-slate-700 via-50% to-gray-900 to-90% flex">
        {logged ? <Home /> : <Login />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
