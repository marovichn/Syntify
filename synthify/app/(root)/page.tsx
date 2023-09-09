import { getSongs } from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/app/(root)/components/PageContent";
import CopyRights from "@/components/CopyRights";

export const revalidate = 0;

const Home = async () => {
  const songs = await getSongs();

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto min-[0px]:max-md:w-[97%] min-[0px]:max-md:mx-auto'>
      <Header>
        <div className='mb-2'>
          <h1 className='mt-6 font-extrabold text-transparent min-[0px]:max-sm:text-4xl text-6xl bg-clip-text bg-gradient-to-r from-white to-white pb-4'>
            Welcome back
          </h1>
          <div
            className='
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4 
              gap-3 
              mt-4
            '
          >
            <ListItem
              name='Liked Songs'
              image='/images/like.png'
              href='liked'
            />
          </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-white text-3xl font-semibold'>Newest songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
      <CopyRights/>
    </div>
  );
};
export default Home;
