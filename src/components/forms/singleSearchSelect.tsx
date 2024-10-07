import React from "react";
import { ChevronDownIcon, SearchBarIcon, SquareCloseIcon } from "@/assets";
import clsx from "clsx";
import Select, {
  ClearIndicatorProps,
  components,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
  OptionProps,
  Props,
  ValueContainerProps,
} from "react-select";

function DropdownIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.DropdownIndicator {...props}>
      {!props.selectProps.isSearchable ? (
        <ChevronDownIcon
          className={clsx(
            "min-h-[20px] min-w-[20px] transition-transform duration-200",
            props.selectProps.menuIsOpen && "-rotate-180",
          )}
        />
      ) : (
        <SearchBarIcon />
      )}
    </components.DropdownIndicator>
  );
}

function Control<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({ children, ...props }: ControlProps<Option, IsMulti, Group>) {
  return (
    <components.Control
      {...props}
      innerProps={{
        ...props.innerProps,
        className: clsx("w-full !px-4 !rounded-md h-[56px] !shadow-none"),
      }}
    >
      {children}
    </components.Control>
  );
}

function IndicatorSeparator<Option, IsMulti extends boolean>({
  innerProps,
}: IndicatorSeparatorProps<Option, IsMulti>) {
  return <span {...innerProps} />;
}

function ClearIndicator<Option, IsMulti extends boolean>(
  props: ClearIndicatorProps<Option, IsMulti>,
) {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref}>
      <SquareCloseIcon className="[&_path]:fill-error [&_path]:stroke-error" />
    </div>
  );
}

function ValueContainer<Option>({
  children,
  ...props
}: ValueContainerProps<Option>) {
  return (
    <components.ValueContainer
      {...props}
      innerProps={{
        ...props.innerProps,
        className: clsx("!py-[0.6875rem] gap-2 !h-fit"),
      }}
    >
      {children}
    </components.ValueContainer>
  );
}

function Option<Option>(props: OptionProps<Option>) {
  return (
    <components.Option
      {...props}
      innerProps={{
        ...props.innerProps,
        className: clsx(
          "!cursor-pointer !bg-white !p-6 !py-4 !text-[0.875rem] !text-primary-main",
        ),
      }}
    />
  );
}

function SingleSearchSelect<Option, Group extends GroupBase<Option>>(
  props: Props<Option, false, Group> & { label?: string; errorMsg?: string },
) {
  const { label, errorMsg, ...rest } = props;

  return (
    <div className="flex w-full flex-col text-left font-tv2SansDisplay">
      {label && (
        <label
          htmlFor={rest.id}
          className={clsx(
            "mb-2 w-fit cursor-pointer text-xs",
            errorMsg ? "text-red-600" : "text-tertiary-pale-950",
          )}
        >
          {label}
        </label>
      )}
      <Select
        components={{
          Control,
          DropdownIndicator,
          IndicatorSeparator,
          ClearIndicator,
          Option,
          ValueContainer,
        }}
        isMulti={false}
        isSearchable={props.isSearchable}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: errorMsg ? "#EB5757" : "#BDBDBD",
            ":hover": { borderColor: errorMsg ? "#EB5757" : "green" },
            background: "#def2fb4d",
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: "14px",
            color: "#AAAAAA",
            fontWeight: "light",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#243665",
            fontWeight: 600,
            fontSize: "0.875rem",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#243665 !important"
              : base.backgroundColor,
            color: state.isSelected ? "green !important" : "green",
            ":active": {
              backgroundColor: state.isSelected
                ? "#243665 !important"
                : "#E9EBF0 !important",
            },
            ":hover": {
              backgroundColor: state.isSelected
                ? "#243665 !important"
                : "#E9EBF0 !important",
            },
          }),
        }}
        {...rest}
        closeMenuOnSelect
      />
      {errorMsg ? <div className="text-sm text-red-500">{errorMsg}</div> : null}
    </div>
  );
}

export { SingleSearchSelect };
