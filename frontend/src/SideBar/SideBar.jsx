import { useState } from 'react'
import './SideBar.css'

export default function SideBar({ users, selectedUserId, onSelectUser, onCreateUser }) {
    const [username, setUsername] = useState('')
    const [creating, setCreating] = useState(false)

    const handleCreate = async (event) => {
        event.preventDefault()
        if (!username.trim()) return
        setCreating(true)
        try {
            await onCreateUser(username.trim())
            setUsername('')
        } finally {
            setCreating(false)
        }
    }

    return (
        <aside className="sidebar-main">
            <div className="brand"><span className="brand-mark">↗</span><span>Ledgerly</span></div>
            <p className="sidebar-label">Workspace</p>
            <button className="nav-button active"><span>⌂</span> Overview</button>
            <button className="nav-button"><span>◷</span> Activity</button>
            <div className="sidebar-spacer" />
            <p className="sidebar-label">Accounts</p>
            <div className="account-list">
                {users.map((user) => (
                    <button key={user.id} className={`account-button ${user.id === selectedUserId ? 'selected' : ''}`} onClick={() => onSelectUser(user.id)}>
                        <span className="avatar">{user.username?.charAt(0).toUpperCase()}</span>{user.username}
                    </button>
                ))}
            </div>
            <form className="new-account" onSubmit={handleCreate}>
                <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="New account" aria-label="New account name" />
                <button type="submit" disabled={creating}>{creating ? '…' : '+'}</button>
            </form>
            <div className="sidebar-footer">Personal finances, made simple.</div>
        </aside>
    )
}