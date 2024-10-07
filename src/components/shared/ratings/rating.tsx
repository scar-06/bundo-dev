/* eslint-disable array-callback-return */
import React from "react";
import {
  GoldStarIcon,
  GreyStarIcon,
  SmallGreyStar,
  SmallRating,
} from "@/assets";

// import { twMerge } from "tailwind-merge";

interface RatingProps {
  actual: number | null;
  readonly?: boolean;
  starSize?: number | string;
  onChange?: (_val: number) => void;
  smallStar?: boolean;
}
function Rating(props: RatingProps) {
  const { actual, onChange, readonly, starSize, smallStar = false } = props;
  const length = 5;
  const [starValue, setStarValue] = React.useState(actual || 0);
  const floorValue = Math.floor(starValue);
  const starLength = new Array(length).fill(Math.random() * length);

  const handleStarClick = (values: number) => {
    if (readonly) {
      return;
    }

    if (Number.isInteger(starValue)) {
      setStarValue(values + 1);
      if (onChange) {
        onChange(values + 1);
      }
    } else {
      setStarValue(values + 2);
      if (onChange) {
        onChange(values + 2);
      }
    }
  };

  return (
    <div className="flex items-center justify-start gap-1">
      {starLength.map((_, idx) => {
        // this is for the full star
        if (
          floorValue > idx ||
          (floorValue === idx && floorValue < starValue)
        ) {
          return (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {smallStar ? (
                <SmallRating
                  key={Math.random() * Math.PI}
                  style={{
                    width: `${starSize}`,
                  }}
                  className={`${readonly ? "" : "cursor-pointer"}`}
                  onClick={() => handleStarClick(idx)}
                />
              ) : (
                <GoldStarIcon
                  key={Math.random() * Math.PI}
                  style={{
                    width: `${starSize}`,
                  }}
                  className={`${readonly ? "" : "cursor-pointer"}`}
                  onClick={() => handleStarClick(idx)}
                />
              )}
            </>
          );
        }

        if (starValue < idx || starValue === idx) {
          // this is for last star
          return (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {smallStar ? (
                <SmallGreyStar
                  key={Math.random() * Math.PI}
                  className={`${readonly ? "" : "cursor-pointer"}`}
                  onClick={() => handleStarClick(idx)}
                  style={{
                    width: `${starSize}`,
                  }}
                />
              ) : (
                <GreyStarIcon
                  key={Math.random() * Math.PI}
                  className={`${readonly ? "" : "cursor-pointer"}`}
                  onClick={() => handleStarClick(idx)}
                  style={{
                    width: `${starSize}`,
                  }}
                />
              )}
            </>
          );
        }
      })}
    </div>
  );
}

export default Rating;

// type StarIconProps = React.HTMLAttributes<HTMLSpanElement>;
// function StarIcon({ className, ...rest }: StarIconProps) {
//   return (
//     <span
//       className={twMerge(
//         "p-2 rounded-full cursor-pointer inline-block h-2 w-2 bg-yellow-300",
//         className
//       )}
//       {...rest}
//     />
//   );
// }
