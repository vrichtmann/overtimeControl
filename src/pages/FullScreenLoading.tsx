import { AiOutlineLoading } from "react-icons/ai";

export const FullScreenLoading = () => {
  return (
    <div className="w-screen h-screen fixed flex">
      <div className="m-auto flex justify-center flex-col">
        <AiOutlineLoading className="animate-spin mx-auto text-2xl" />
        <div className="text-2xl">Carregando</div>
      </div>
    </div>
  );
};
