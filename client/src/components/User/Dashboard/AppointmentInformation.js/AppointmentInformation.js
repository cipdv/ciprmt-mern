import React from 'react'
//styling
import styles from '../dashboard.module.css'

const AppointmentInformation = () => {
  return (
    <div className={styles.box}>
        <h3>What to know for your treatments:</h3>
        <div style={{marginTop: '1rem'}}>
            <h3>Location:</h3>
            <p>268 Shuter Street, Toronto ON.</p>
            <p>Please plan to arrive no earlier than 10 minutes before your appointment as I may still need time to clean and disinfect after the previous appointment.</p>
            <p>There is parking available at the side of the building, on Berkeley Street and free street parking available on Shuter Street and Berkeley Street.</p>
            <h3>What to wear:</h3>
            <p>Thai massage is practiced over clothing, so please bring comfortable, loose fitting clothing that you will be able to stretch in, including pants or shorts, and a short or long-sleeved t-shirt made from soft natural fabric like cotton, bamboo, or hemp.</p>
            <p>It may seem counter-intuitive, but more coverage is better for this style of massage.</p>
            <p>You may change clothing here, or come fully dressed.</p>
            <h3>What NOT to wear:</h3>
            <ul>
                <li>Clothing with zippers</li>
                <li>Slippery fabrics like polyester (For example: UnderArmour)</li>
                <li>Shirts without sleeves (For example: tank tops)</li>
                <li>Extremely short shorts - aim for knee length or lower</li>
                <li>Strong scents (For example: perfume, cologne)</li>
            </ul>
            <h3>Payment:</h3>
            <p>Preferred payment methods are debit, email money transfer, and cash, but I can take credit card payments as well. Your receipt will be available on your profile within 24 hours of your appointment.</p>
            <h3>Medications:</h3>
            <p>It is important that you can fully feel what is happening during the massage, so please refrain from taking any pain medications at least 2 hours before your appointment start-time.</p>
        </div>
    </div>
  )
}

export default AppointmentInformation