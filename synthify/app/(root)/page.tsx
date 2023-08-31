import Header from "@/components/Header";

const Home = () => {
  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto min-[0px]:max-md:w-[97%] min-[0px]:max-md:mx-auto'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-bold'>
            Welcome back, Nikola.
          </h1>
        </div>
      </Header>
    </div>
  );
};
export default Home;
