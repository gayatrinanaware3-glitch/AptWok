module 0x1::escrow {
    use std::signer;
    use aptos_framework::aptos_coin;
    use aptos_framework::coin;

    struct Escrow has key {
        client: address,
        developer: address,
        amount: u64,
        released: bool,
    }

    public entry fun create_escrow(
        account: &signer,
        client: address,
        developer: address,
        amount: u64
    ) {
        let escrow = Escrow { client, developer, amount, released: false };
        move_to(account, escrow);
    }

    public entry fun release_payment(
        account: &signer,
        to: address,
        amount: u64
    ) {
        // Withdraw AptosCoin from signer
        let coin_to_send = coin::withdraw<aptos_coin::AptosCoin>(account, amount);

        // Deposit into recipient's account
        coin::deposit<aptos_coin::AptosCoin>(to, coin_to_send);
    }
}
