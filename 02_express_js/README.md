## Restfull API (Representational State Transfer)

Architectural Style

## Key principal of Rest Api

Http,
Statelessness:
You are not allow to store any data inside the server because these server scale automatically UP & DOWN
Follow client Server Architectual:
Backend Should not be responsible for the frontend backend just send the data no code cuppling

### Uniform Interface

The API should be consistent and predictable
/users
/users/10
/orders/3/items

Use nouns, not verbs
❌ /getUsers
✅ /users
