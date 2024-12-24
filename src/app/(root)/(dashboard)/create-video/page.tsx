import CreateVideoForm from "@/components/CreateVideoForm";

const CreateVideoPage = () => {
  return (
    <div className="bg-lime-500 w-full max-w-7xl p-5 h-[100rem] space-y-7">
      {/* Header */}
      <header className="bg-rose-500 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Create a Video</h1>
      </header>

      {/* Video */}
      <section className="bg-fuchsia-600">
        <CreateVideoForm />
      </section>
    </div>
  );
};

export default CreateVideoPage;
