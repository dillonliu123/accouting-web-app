import React from "react"

function AccountsList({accounts}) {
    const itemList =
       accounts.map((item) => {
                return <li>{item.accountName}</li>
            })

    return (
        <div>
            {itemList}
        </div>
    )
}

export default AccountsList