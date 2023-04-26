/**
 * Creates Destination select box.
 * @param on_change function that will be called when value is selected
 * @returns {JSX.Element} Destination select box
 * @constructor
 */
export default function Destination({on_change}) {
  return (
    <select name="destination" id="destination" defaultValue="default" onChange={on_change}>
      <option value="default" disabled hidden>
        Destination
      </option>

      {/* 1 Star */}
      <optgroup label="★">
        <option value="bank">Bank</option>
        <option value="car">Car</option>
        <option value="rent">Rent</option>
        <option value="family">Family</option>
        <option value="fees">Fees</option>
        <option value="food">Food</option>
        <option value="fuel">Fuel</option>
        <option value="healthcare">Healthcare</option>
        <option value="household">Household</option>
        <option value="insurance">Insurance</option>
        <option value="job">Job</option>
        <option value="phone_internet">Phone/Internet</option>
        <option value="fines">Fines</option>
        <option value="supplements">Supplements</option>
        <option value="transport">Transport</option>
      </optgroup>

      {/* 2 Stars */}
      <optgroup label="★★">
        <option value="meal">Meal</option>
        <option value="personal_care">Personal Care</option>
        <option value="app_software">App/Software</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
        <option value="friends">Friends</option>
        <option value="gifts">Gifts</option>
        <option value="lost">Lost</option>
        {/* Why the hell is it in 2 stars??? WDYM?? */}
        <option value="other">Other</option>
        <option value="shipping">Shipping</option>
        <option value="sport">Sport</option>
        <option value="crypto">Crypto</option>
        <option value="accessories">Accessories</option>
        <option value="cafe">Café</option>
        <option value="clothing">Clothing</option>
      </optgroup>

      {/* 3 Stars */}
      <optgroup label="★★★">
        <option value="movies">Cinema</option>
        <option value="bet">Bet</option>
        <option value="entertainment">Entertainment</option>
        <option value="fun">Fun</option>
        <option value="gaming">Gaming</option>
        <option value="hobby">Hobby</option>
        <option value="hotel">Hotel</option>
        <option value="pub">Pub</option>
        <option value="munchies">Munchies</option>
        <option value="restaurant">Restaurant</option>
        <option value="stuff">Stuff</option>
        <option value="travel">Travel</option>
      </optgroup>
    </select>
  )
}
