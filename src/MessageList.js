import styles from './MessageList.module.css'


const MessageList = ({ messages }) => (
    <ul className={styles.list} aria-label="Lista de Mensagens">
        {messages.map((message, index) => (
            <li key={index}>{message}</li>
        ))}
    </ul>
)

export default MessageList