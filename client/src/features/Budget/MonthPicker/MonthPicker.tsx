import styles from './MonthPicker.module.scss';
import Calendar from 'react-calendar';

export default function MonthPicker() : JSX.Element { 
    return <div>
        <h1>Choose your month</h1>
        <Calendar onChange={(data) => console.log(data)} defaultView='month' maxDetail='year' showNavigation={false} tileClassName={styles.tileStyle} className={styles.calendar}/>
    </div>
}