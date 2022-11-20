import {useState, useEffect} from 'react';

const ShowTime = () => {
    

    return (
        <div class='times'>
            <form>
                <table>
                    <th><button className="main" type='#at8am'>8:00 AM</button></th>
                    <th><button className="main" type='#at9am'>9:00 AM</button></th>
                    <th><button className="main" type='#at10am'>10:00 AM</button></th>
                    <th><button className="main" type='#at11am'>11:00 AM</button></th>
                    <th><button className="main" type='#at12pm'>12:00 PM</button></th>
                    <th><button className="main" type='#at1pm'>1:00 PM</button></th>
                    <th><button className="main" type='#at2pm'>2:00 PM</button></th>
                    <th><button className="main" type='#at3pm'>3:00 PM</button></th>
                    <th><button className="main" type='#at4pm'>4:00 PM</button></th>
                    <th><button className="main" type='#at5pm'>5:00 PM</button></th>
                    <th><button className="main" type='#at6pm'>6:00 PM</button></th>
                    <th><button className="main" type='#at7pm'>7:00 PM</button></th>
                    <th><button className="main" type='#at8pm'>8:00 PM</button></th>
                </table>
            </form>
      </div>
    )
}

export default ShowTime