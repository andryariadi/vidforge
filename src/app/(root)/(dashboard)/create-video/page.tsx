import CreateVideoForm from "@/components/CreateVideoForm";

const CreateVideoPage = () => {
  return (
    <div className="b-lime-500 w-full max-w-7xl px-10 py-5 h-[100rem] space-y-7">
      {/* Header */}
      <header className="b-rose-500 flex items-center justify-between">
        <h1 className="text-16 md:text-20 font-bold text-orange-1">Create a Video</h1>
      </header>

      {/* Video */}
      <section className="b-fuchsia-600">
        <CreateVideoForm />
      </section>
    </div>
  );
};

export default CreateVideoPage;
