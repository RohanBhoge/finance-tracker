import { useDispatch } from "react-redux";
import { useCurrency } from "../hooks/useCurrency";
import { setDisplayCurrency } from "../features/settings/settingsSlice";
import Card from "../components/Card";

const SettingsPage = () => {
  const dispatch = useDispatch();

  const { displayCurrency, rates } = useCurrency();

  return (
    <div>
      <Card className="max-w-md">
        <h3 className="text-lg font-semibold mb-2 text-black">
          Display Currency
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose the currency to display all financial values in.
        </p>

        <select
          value={displayCurrency}
          onChange={(e) => dispatch(setDisplayCurrency(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        >
          {rates &&
            Object.keys(rates.conversion_rates).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      </Card>
    </div>
  );
};

export default SettingsPage;
