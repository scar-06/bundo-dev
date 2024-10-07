interface CurrencyFormatterProps {
  currency?: string | undefined; // Currency code, e.g., NGN for Nigerian Naira or USD for US Dollar.
  currencyDisplay?: "symbol" | "narrowSymbol" | "code" | "name"; // How to display the currency in format.
  notation?: "standard" | "scientific" | "engineering" | "compact"; // Notation to use in formatting.
  showCurrency?: boolean; // Whether to display the currency symbol/code.
}

/**
 * Default options for currency formatting.
 */
const defaultOptions: CurrencyFormatterProps = {
  currency: "NGN", // Default currency code.
  currencyDisplay: "symbol", // Default display as symbol.
  notation: undefined, // Default notation, let Intl decide based on value.
  showCurrency: true, // By default, show the currency symbol/code.
};

/**
 * Formats a number or string to a specified currency format.
 *
 * @param value The numeric value to format as a string or number.
 * @param opts (Optional) Custom formatting options to override default settings.
 * @returns Formatted currency string.
 */
export const currency = (
  value: string | number,
  // eslint-disable-next-line default-param-last
  opts: CurrencyFormatterProps = defaultOptions,
  locale?: "en_US" | "zh-CN" | "zh-TW" | "en-NG" | undefined,
): string => {
  // Merge user options with default options
  const options = { ...defaultOptions, ...opts };

  // If showCurrency is false, return the value without formatting as currency
  if (!options.showCurrency) {
    return new Intl.NumberFormat(locale || "en-US", {
      notation: options.notation,
    }).format(Number(value));
  }

  // Create Intl.NumberFormat instance with merged options
  const formatter = new Intl.NumberFormat(locale || "en-US", {
    style: "currency",
    currency: options.currency,
    currencyDisplay: options.currencyDisplay,
    notation: options.notation,
  });

  // Format and return the value
  return formatter.format(Number(value));
};
