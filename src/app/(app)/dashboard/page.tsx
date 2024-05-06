"use server";

export default async function Dashboard() {

  return (
    <>
      <div
        className={`absolute top-0 inset-0 z-20 sm:m-auto flex sm:max-h-[500px] sm:w-[450px] w-full flex-col sm:rounded-[32px] bg-gradient-to-b from-white via-white/75 to-white/0 sm:via-white/95 sm:to-white/75 py-32 p-8 sm:p-8 sm:shadow-lg transition-all duration-200 ease-in-out`}
      >
        <h1 className="mt-8 text-center text-xl font-bold text-gray-900">
          Welcome to Smover
        </h1>
      </div>
    </>
  );
}
