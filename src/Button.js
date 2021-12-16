
import styles from './Button.module.css'

const Button = ({ onClick, color, children }) => (
    <button onClick={onClick} className={styles.button} style={{ backgroundColor: color }}>
        {children}
    </button>
)

export default Button