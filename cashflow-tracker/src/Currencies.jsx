/**
 * Creates Currency select box.
 * @returns {JSX.Element} Currency select box
 * @constructor
 */
export default function Currencies() {
  return (
    <select name="currency" id="currency">
      <option value="eur">€</option>
      <option value="usd">$</option>
      <option value="gbp">£</option>
    </select>
  )
}
