import React from 'react'
import styles from './styles.module.css'
import glutes from '../../../images/glutes.jpg'
import chestwall from '../../../images/chestwall.jpg'
import abdomen from '../../../images/abdomen.jpg'
import innerthighs from '../../../images/innerthighs.jpg'

const ConsentInfo = () => {
    return (
        <div className={styles.box}>
            <div>
                <h3>What are these areas and why are they considered sensitive?</h3>
                <p>
                    <a href="https://www.cmto.com/rules/consent/">The CMTO</a> considers the following areas sensitive and requires that informed written consent be obtained before assessing or treating these areas to ensure that you as a patient understand why these areas might be touched, and to offer alternatives if you are uncomfortable with these areas being touched at this time. I have also included a section to add any other areas that you personally feel are sensitive to you and would not like to have assessed and treated at this time.
                </p>
                <div style={{marginTop: '1rem'}}>
                    <h4>Glutes</h4>
                    <img src={glutes} style={{maxWidth: '20rem', maxHeight: '20rem'}}/>
                    <p>
                        The gluteal muscles, more commonly reffered to as your buttocks, are involved in movement of your hips and stablization of your hips and pelvis. If you are experiencing lower back pain, hip pain, knee pain, or pain referring down your leg, it may be caused by issues involving your gluteal musculature. Assessing and treating these areas could include touching and stretching these areas to feel for excessive tension in the musculature, and feeling for specific points that may be referring pain to other areas in your body.
                    </p>    
                </div> 
                <div style={{marginTop: '1rem'}}>
                    <h4>Chest wall muscles</h4>
                    <img src={chestwall} style={{maxWidth: '20rem', maxHeight: '20rem'}}/>
                    <p>
                        The chest wall musculature can include the pectoralis muscles, serratus muscles, and abdominis muscles. These muscles are involved in the movement and stability of your shoulders and upper torso, and they can often cause postural imbalances which can lead to pain and aching muscles in other areas such are your chest, upper back and lower back, neck and shoulders, and between your shoulder blades. Assessing these areas could include touching and stretching of these muscles to feel for tightness or specific points that may be causing pain in any of these areas. Note: this does not include breast tissue. If you do require breast tissue massage for a medical reason, please text Cip de Vries at 416-258-1230 directly to discuss this further.
                    </p>    
                </div> 
                <div style={{marginTop: '1rem'}}>
                    <h4>Abdomen</h4>
                    <img src={abdomen} style={{maxWidth: '20rem', maxHeight: '20rem'}}/>
                    <p>
                        The muscles in your abdomen are extremely important for the maintenance of healthy posture and movement of the torso, hips and shoulders. Often from prolonged periods of sitting, these muscles can become shortened and tight which can lead to imbalances in the musculature of the back side which can lead to pain or sore, aching muscles in the back, as well as decreased athletic performance. Assessing and treating these areas often involves stretching and massaging of the musculature of the abdomen to relieve this excessive tightness and lengthen the musculature to a more relaxed resting state.
                    </p>    
                </div> 
                <div style={{marginTop: '1rem'}}>
                    <h4>Inner thighs</h4>
                    <img src={innerthighs} style={{maxWidth: '20rem', maxHeight: '20rem'}}/>
                    <p>
                        The musculature of the inner thighs can be very sensitive for a lot of people. These muscles provide stability to our hips and pelvis and are involved in almost every movement we make involving the lower half our of bodies, and because of this they can become extremely overworked causing them to become tight and stiff. Assessing and treating the inner thighs can include stretching and touching of the musculature to locate and relieve the source of excessive tightness and tension within the muscles that may be causing pain in these areas or within the hips or knees.
                    </p>    
                </div>    
            </div>
            <div style={{marginTop: '1rem'}}>
                <h3>What are the risks and benefits of having these areas assessed and/or treated?</h3>
                <div>
                    When our muscles are overworked, overstretched, strained or damaged in some way, they can ache and cause pain in the area and throughout the body. Assessing these areas helps RMTs discover what may be causing you pain or discomfort and provide proper treatment to help get rid of this pain, and rule out other possibilities that may require treatment from other health care professionals. The goal of the assessment/treatment is not to hurt you, but some of the assessments and treatment techniques may cause pain or discomfort as the tissues are being stretched or compressed, and may have lingering effects. There is also the risk that the tissues can be further damaged, causing more pain or loss of function. You can ask to stop or modify the assessment/treatment anytime, so please be vocal if you feel that your body is not responding well.  
                </div>    
            </div>
            <div style={{marginTop: '1rem'}}>
                <h3>What if I don't consent to these areas being assessed and treated?</h3>
                <div>
                    Giving consent to treat these areas is completely voluntary. Alternatives can be made if you do not feel comfortable with any or all of these areas being touched or stretched for the purposes of assessing and treating these areas, including performing self-stretching or self-massage without direct contact from a Massage Therapist.
                </div>    
            </div>
            <div style={{marginTop: '1rem'}}>
                <h3>What if I change my mind to these areas being assessed and treated?</h3>    
                <div>
                    Giving your consent now does not mean that you cannot change your mind any time before or even during the massage. If you feel uncomfortable with any parts of the assessing or treating of any part of your body, please feel welcome to express this in writing via text (416-258-1230) or email (cip.devries@gmail.com) or verbally to Cip de Vries, RMT. Your comfort is extremely important to receiving the best treatment possible for you, and I will check in with you throughout the massage to ensure that you are still comfortable with the proposed assessment and treatment. If you do change your mind, alternatives can be given to assessing and treating these areas, and other areas in your body that you consider to be sensitive. 
                </div>
            </div>
        </div>
    )
}

export default ConsentInfo
