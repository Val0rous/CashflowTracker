/**
 * Creates Operation Type Selection segmented button.
 * @returns {JSX.Element} Operation Type Selection segmented button
 * @constructor
 */
export default function OperationType() {
  return (
    <fieldset>
      <input
        type="radio"
        name="type"
        id="type_output"
        value="output"
        defaultChecked
      />
      <label htmlFor="type_output">
              <span className="material-symbols-rounded radio_icon output">
                north
              </span>
        <span className="radio_label">
                Output
              </span>
      </label>
      <input
        type="radio"
        name="type"
        id="type_input"
        value="input"
      />
      <label htmlFor="type_input">
              <span className="material-symbols-rounded radio_icon input">
                south
              </span>
        <span className="radio_label">
                Input
              </span>
      </label>
      <input
        type="radio"
        name="type"
        id="type_transfer"
        value="transfer"
      />
      <label htmlFor="type_transfer">
              <span className="material-symbols-rounded radio_icon transfer">
                sync_alt
              </span>
        <span className="radio_label">
                Transfer
              </span>
      </label>
    </fieldset>
  )
}
