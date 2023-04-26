/**
 * Creates Source select box.
 * @param on_change function that will be called when value is selected
 * @returns {JSX.Element} Source select box
 * @constructor
 */
export default function Source({on_change}) {
  return (
    <select name="source" id="source" defaultValue="default" onChange={on_change}>
      <option value="default" disabled hidden>
        Source
      </option>
      <optgroup label="Cash">
        <option value="wallet">Wallet</option>
        <option value="pocket">Pocket</option>
      </optgroup>
      <optgroup label="Digital">
        <option value="satispay">Satispay</option>
        <option value="paypal">PayPal</option>
        <option value="hype">Hype</option>
        <option value="revolut">Revolut</option>
      </optgroup>
      <optgroup label="Banks">
        <option value="bcc">BCC</option>
        <option value="intesa_sanpaolo">Intesa Sanpaolo</option>
        <option value="unicredit">Unicredit</option>
        <option value="bper">BPER</option>
        <option value="n26">N26</option>
      </optgroup>
      <optgroup label="Other">
        <option value="extra">Extra</option>
      </optgroup>
      {/* Add option in settings to change this list completely, with a reset to default button */}
    </select>
  )
}
