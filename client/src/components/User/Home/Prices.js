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
                        <td>$105</td>
                    </tr>
                    <tr>
                        <td>75 minutes</td>
                        <td>$125</td>
                    </tr>
                    <tr>
                        <td>90 minutes</td>
                        <td>$145</td>
                    </tr>
                </tbody>
            </table>
            <div style={{fontSize: '12px'}}>
                *All prices include HST
            </div>
        </div>
    )
}

export default Prices;
