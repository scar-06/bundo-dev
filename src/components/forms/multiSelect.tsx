"use client";

import React from "react";
import { CloseCircleBold, SearchBarIcon, SquareCloseIcon } from "@/assets";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import Select, {
  ClearIndicatorProps,
  components,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  OptionProps,
  Props,
  ValueContainerProps,
} from "react-select";

function DropdownIndicator<
  Option,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
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
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ children, ...props }: ControlProps<Option, IsMulti, Group>) {
  return (
    <components.Control
      {...props}
      innerProps={{
        ...props.innerProps,
        className: clsx("w-full !px-4 !rounded-xl !shadow-none"),
      }}
    >
      {children}
    </components.Control>
  );
}

function IndicatorSeparator<Option, IsMulti extends boolean = true>({
  innerProps,
}: IndicatorSeparatorProps<Option, IsMulti>) {
  return <span {...innerProps} />;
}

function MultiValueRemove<Option, IsMulti extends boolean = true>(
  props: MultiValueRemoveProps<Option, IsMulti>,
) {
  return (
    <div className="group">
      <components.MultiValueRemove
        {...props}
        innerProps={{
          ...props.innerProps,
          className: clsx(
            "flex hover:!bg-transparent group-hover:[&_path]:fill-error group-hover:[&_path]:stroke-error items-center !px-0  top-1/2 -translate-y-1/2 right-2 absolute",
          ),
        }}
      >
        <CloseCircleBold />
      </components.MultiValueRemove>
    </div>
  );
}

function MultiValueLabel<Option, IsMulti extends boolean = true>(
  props: MultiValueGenericProps<Option, IsMulti>,
) {
  return (
    <span>
      <components.MultiValueLabel
        {...props}
        innerProps={{
          ...props.innerProps,
          className: clsx(
            "flex !items-center !font-semibold !text-green-500 !px-2 !pr-0 !h-8",
          ),
        }}
      />
    </span>
  );
}

function MultiValueContainer<Option>(props: MultiValueGenericProps<Option>) {
  return (
    <components.MultiValueContainer
      {...props}
      innerProps={{
        ...props.innerProps,
        className: clsx(
          "relative !bg-[rgba(222,_242,_251,_0.80)] flex !rounded !pr-8",
        ),
      }}
    />
  );
}

function ClearIndicator<Option, IsMulti extends boolean = true>(
  props: ClearIndicatorProps<Option, IsMulti>,
) {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;

  return (
    <div {...restInnerProps} ref={ref}>
      <SquareCloseIcon className="[&_path]:fill-error [&_path]:stroke-error " />
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

function MultiSearchSelect<
  Option,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group> & { label?: string; errorMsg?: string },
) {
  const { label, isMulti = true, errorMsg, ...rest } = props;

  return (
    <div className=" flex w-full flex-col text-left font-tv2SansDisplay">
      {label && (
        <label
          htmlFor={rest.id}
          className={clsx(
            "mb-2 w-fit cursor-pointer text-xs ",
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
          MultiValueLabel,
          MultiValueRemove,
          MultiValueContainer,
          ClearIndicator,
          Option,
          ValueContainer,
        }}
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
        isMulti={isMulti as IsMulti}
        {...rest}
        closeMenuOnSelect
      />

      {errorMsg ? <div className="text-sm text-red-500">{errorMsg}</div> : null}
    </div>
  );
}

export { MultiSearchSelect };
