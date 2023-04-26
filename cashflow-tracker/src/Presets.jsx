/**
 * Creates Preset buttons.
 * @param on_click function that will be called when button is clicked
 * @returns {JSX.Element} Preset buttons
 * @constructor
 */
export default function Presets({on_click}) {
  return (
    <div className="preset">
      <button type="button" id="preset_amount_1" value="1" onClick={on_click}>1</button>
      <button type="button" id="preset_amount_2" value="2" onClick={on_click}>2</button>
      <button type="button" id="preset_amount_5" value="5" onClick={on_click}>5</button>
      <button type="button" id="preset_amount_10" value="10" onClick={on_click}>10</button>
      <button type="button" id="preset_amount_20" value="20" onClick={on_click}>20</button>
      <button type="button" id="preset_amount_50" value="50" onClick={on_click}>50</button>
      <button type="button" id="preset_amount_100" value="100" onClick={on_click}>100</button>
    </div>
  )
}
