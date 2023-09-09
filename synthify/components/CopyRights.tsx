import { FC } from "react";

interface CopyRightsProps {}

const CopyRights: FC<CopyRightsProps> = ({}) => {
  return (
    <div className="relative -bottom-[screen-h]">
      <div className='w-full flex items-center justify-center pt-20 pb-2'>
        <p className='text-neutral-600 align center text-sm'>
          Copyright © 2023 Synthify®. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default CopyRights;
