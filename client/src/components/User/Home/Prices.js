import React from 'react';
import styles from './styles.module.css'

const Prices = () => {
    
    return (
        <div className={styles.box}>
            <table>
                <thead>
                    <tr>
                        <th>Duration</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>60 minutes</td>
                        <td>$105 (includes HST)</td>
                    </tr>
                    <tr>
                        <td>75 minutes</td>
                        <td>$125 (includes HST)</td>
                    </tr>
                    <tr>
                        <td>90 minutes</td>
                        <td>$145 (includes HST)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Prices;
