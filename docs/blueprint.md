# **App Name**: EliteDraft Auction

## Core Features:

- Player Auction Display: Displays the current player's name, their prominent current bid amount (₹), and the auction status ('BIDDING' or 'SOLD') with a central focus.
- Bidding & Sale Controls: Provides interactive buttons (+100, +500, +1000) and keyboard shortcuts (1, 2, 3) for increasing bids, along with an 'Enter' key binding to mark a player as 'SOLD'.
- Team Management & Budget Tracking: Lists 4-6 teams on a left panel, showing their names and remaining budgets. Selected teams are highlighted, and bidding is prevented if the chosen team has insufficient funds.
- Sold Player List & History: Maintains a real-time list on the right panel of all sold players, detailing their name, the team they were sold to, and their final auction price.
- Auction Flow Automation: Manages the progression through a predefined list of players, automatically moving to the next player after a sale and resetting the bid to zero.
- Real-time Visual Feedback: Includes dynamic visual elements such as bid increase animations, a quick 'SOLD' animation, team selection highlighting, and styled alert popups for notifications like 'Insufficient Budget' or 'Auction Finished'.
- Client-side Player Data Management: Manages the entire predefined player list, their bidding status, and assignment to teams using only client-side JavaScript for fully offline functionality.

## Style Guidelines:

- The overall interface employs a dark theme with a deep slate background (#14191C) to enhance projector visibility and evoke a sophisticated, professional sports ambiance.
- A vibrant electric blue (#4AB0ED) serves as the primary color for displaying current bids, active controls, and highlights, symbolizing energy and live action.
- A bright aqua accent color (#62FCE5) is used for specific interactive elements, selected team highlighting, and crucial notifications, ensuring high visibility against the dark background.
- The font 'Space Grotesk' (sans-serif) is recommended for all text. Its bold, modern, and techy characteristics are ideal for clear visibility on a projector, especially for large player names and bid amounts.
- Utilize minimalist line-based icons or clean vector graphics for controls and information indicators to maintain a sleek and modern 'IPL-style' aesthetic suitable for projection.
- The layout features a prominent central 'player card' displaying key auction information. This is flanked by a left panel for team budgets and a right panel for the sold players list, all adhering to a clean, card-style UI with rounded corners and subtle depth-adding shadows.
- Implement smooth visual transitions, such as a scaling or highlighting effect, for bid increments. Quick 'SOLD' animations and team selection glows will provide immediate and engaging feedback, complemented by subtle hover effects on interactive elements and a clear animation for the optional countdown timer.