"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Home,
  Wallet,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";

type AppState =
  | "landing"
  | "auth"
  | "verification"
  | "dashboard"
  | "vault"
  | "repayment";

type StablecoinOption = {
  symbol: string;
  name: string;
  chain: string;
  address: string;
  decimals: number;
};

const STABLECOIN_OPTIONS: StablecoinOption[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    chain: "Ethereum",
    address: "0xA0b86a33E6441E6C7D3E4081C3cC6E7C3c2b4C0d",
    decimals: 6,
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    chain: "Ethereum",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    chain: "Ethereum",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    chain: "Polygon",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 6,
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    chain: "Polygon",
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    decimals: 6,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    chain: "Arbitrum",
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    decimals: 6,
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    chain: "Arbitrum",
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    decimals: 6,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    chain: "Base",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    decimals: 6,
  },
];

export default function Page() {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [propertyVerified, setPropertyVerified] = useState(false);
  const [nftMinted, setNftMinted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedStablecoin, setSelectedStablecoin] =
    useState<StablecoinOption | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [selectedBorrowToken, setSelectedBorrowToken] =
    useState<StablecoinOption | null>(null);

  const handleBankIDAuth = () => {
    // Simulate BankID authentication
    setTimeout(() => {
      setIsAuthenticated(true);
      setCurrentState("verification");
      handlePropertyVerification();
    }, 2000);
  };

  const connectWallet = () => {
    // Simulate Auth0 wallet connection
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress("0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e");
      setDialogMessage("Wallet connected successfully!");
      setShowDialog(true);
      setTimeout(() => setShowDialog(false), 2000);
    }, 1500);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress("");
  };

  const handlePropertyVerification = () => {
    // Simulate Lantmäteriet API call
    setTimeout(() => {
      setPropertyVerified(true);
      handleNFTMinting();
    }, 3000);
  };

  const handleNFTMinting = () => {
    // Simulate NFT minting
    setTimeout(() => {
      setNftMinted(true);
      setDialogMessage("Soulbound NFT Mortgage Deed successfully created!");
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
        setCurrentState("dashboard");
      }, 2000);
    }, 2000);
  };

  const showError = (message: string) => {
    setDialogMessage(message);
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 3000);
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Home className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Swedish Property Mortgage Platform
          </CardTitle>
          <CardDescription>
            Leverage your property ownership for crypto-backed loans through
            secure BankID verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setCurrentState("auth")}
            className="w-full"
            size="lg"
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAuthPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle>BankID Authentication</CardTitle>
          <CardDescription>
            Authenticate with your Swedish BankID to verify your identity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleBankIDAuth} className="w-full" size="lg">
            Authenticate with BankID
          </Button>
          <Button
            onClick={() => setCurrentState("landing")}
            variant="outline"
            className="w-full"
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderVerificationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Property Verification</CardTitle>
          <CardDescription>
            Verifying your property ownership through Lantmäteriet API...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          {isAuthenticated && (
            <p className="text-green-600 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> BankID Authentication
              Successful
            </p>
          )}
          {propertyVerified && (
            <p className="text-green-600 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Property Ownership Verified
            </p>
          )}
          {nftMinted && (
            <p className="text-green-600 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> NFT Mortgage Deed Minted
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-3xl font-bold mb-2">Collateral Dashboard</h1>
          <p className="text-gray-600">
            Manage your property-backed crypto loans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Valuation</CardTitle>
              <CardDescription>
                Current market value from price oracles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                2,450,000 SEK
              </div>
              <p className="text-sm text-gray-500 mt-2">Last updated: Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available LTV Ratio</CardTitle>
              <CardDescription>Maximum loan-to-value ratio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <p className="text-sm text-gray-500 mt-2">
                Up to $950,000 USD in stablecoins
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Interest</CardTitle>
              <CardDescription>
                Accrued interest on active loans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">$0.00</div>
              <p className="text-sm text-gray-500 mt-2">No active loans</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Wallet Connection
              </CardTitle>
              <CardDescription>
                Connect your wallet to access borrowing and repayment features
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!walletConnected ? (
                <Button onClick={connectWallet} className="w-full" size="lg">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Connect Wallet with Auth0
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-green-800">
                        Wallet Connected
                      </div>
                      <div className="text-sm text-green-600">
                        {walletAddress}
                      </div>
                    </div>
                    <Button
                      onClick={disconnectWallet}
                      variant="outline"
                      size="sm"
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              !walletConnected ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => walletConnected && setCurrentState("vault")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Vault Management
              </CardTitle>
              <CardDescription>
                Deposit NFT collateral and borrow stablecoins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled={!walletConnected}>
                Manage Vault
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              !walletConnected ? "opacity-50 cursor-not-allowed" : "
            }`}
            onClick={() => walletConnected && setCurrentState("repayment")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Repayment Center
              </CardTitle>
              <CardDescription>
                Repay loans with cryptocurrency across multiple chains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled={!walletConnected}>
                Make Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderVaultManagement = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Vault Management</h1>
              <p className="text-gray-600">
                Manage your collateral and withdrawals
              </p>
            </div>
            <Button
              onClick={() => setCurrentState("dashboard")}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Collateral</CardTitle>
              <CardDescription>
                Your deposited NFT mortgage deed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold">Soulbound NFT Mortgage Deed</div>
                <div className="text-sm text-gray-600">
                  Property ID: SE-12345-ABCD
                </div>
                <div className="text-sm text-gray-600">
                  Value: $1,000,000 USD
                </div>
              </div>
              <Button className="w-full" variant="outline">
                View NFT Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Balance</CardTitle>
              <CardDescription>
                Your borrowed stablecoin balances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>USDC (Ethereum):</span>
                  <span className="font-semibold">0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>USDC (Polygon):</span>
                  <span className="font-semibold">0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>USDT (Ethereum):</span>
                  <span className="font-semibold">0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>DAI (Ethereum):</span>
                  <span className="font-semibold">0.00</span>
                </div>
              </div>
              <Button className="w-full">Withdraw Stablecoins</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Deposit NFT Collateral</CardTitle>
              <CardDescription>
                Deposit your mortgage deed to access loans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Deposit NFT Collateral
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Borrow Stablecoins</CardTitle>
              <CardDescription>
                Choose your preferred stablecoin and chain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Stablecoin & Chain
                </label>
                <Select
                  onValueChange={(value) => {
                    const token = STABLECOIN_OPTIONS.find(
                      (t) => `${t.symbol}-${t.chain}` === value,
                    );
                    setSelectedBorrowToken(token || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose stablecoin" />
                  </SelectTrigger>
                  <SelectContent>
                    {STABLECOIN_OPTIONS.map((token) => (
                      <SelectItem
                        key={`${token.symbol}-${token.chain}`}
                        value={`${token.symbol}-${token.chain}`}
                      >
                        {token.symbol} on {token.chain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Borrow Amount (USD)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                size="lg"
                disabled={!selectedBorrowToken || !borrowAmount}
                onClick={() => {
                  if (selectedBorrowToken && borrowAmount) {
                    setDialogMessage(
                      `Successfully borrowed ${borrowAmount} ${selectedBorrowToken.symbol} on ${selectedBorrowToken.chain}!`,
                    );
                    setShowDialog(true);
                    setBorrowAmount("");
                    setSelectedBorrowToken(null);
                    setTimeout(() => setShowDialog(false), 3000);
                  }
                }}
              >
                Borrow Stablecoins
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderRepaymentCenter = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Repayment Center</h1>
              <p className="text-gray-600">
                Make payments and track your balance
              </p>
            </div>
            <Button
              onClick={() => setCurrentState("dashboard")}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
              <CardDescription>
                Outstanding loan amount and interest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-lg">
                  <span>Principal:</span>
                  <span className="font-semibold">$0.00 USD</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Interest:</span>
                  <span className="font-semibold">$0.00 USD</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>$0.00 USD</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Interest Rate: 5.5% APR</p>
                <p>Next Payment Due: No active loans</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Make Payment</CardTitle>
              <CardDescription>Pay any amount at any time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Payment Token & Chain
                </label>
                <Select
                  onValueChange={(value) => {
                    const token = STABLECOIN_OPTIONS.find(
                      (t) => `${t.symbol}-${t.chain}` === value,
                    );
                    setSelectedStablecoin(token || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {STABLECOIN_OPTIONS.map((token) => (
                      <SelectItem
                        key={`${token.symbol}-${token.chain}`}
                        value={`${token.symbol}-${token.chain}`}
                      >
                        {token.symbol} on {token.chain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Amount (USD)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                size="lg"
                disabled={!selectedStablecoin || !paymentAmount}
                onClick={() => {
                  if (paymentAmount && selectedStablecoin) {
                    setDialogMessage(
                      `Payment of ${paymentAmount} ${selectedStablecoin.symbol} on ${selectedStablecoin.chain} processed successfully!`,
                    );
                    setShowDialog(true);
                    setPaymentAmount("");
                    setSelectedStablecoin(null);
                    setTimeout(() => setShowDialog(false), 3000);
                  }
                }}
              >
                Process Crypto Payment
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Track your payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              No payment history available
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      {currentState === "landing" && renderLandingPage()}
      {currentState === "auth" && renderAuthPage()}
      {currentState === "verification" && renderVerificationPage()}
      {currentState === "dashboard" && renderDashboard()}
      {currentState === "vault" && renderVaultManagement()}
      {currentState === "repayment" && renderRepaymentCenter()}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {dialogMessage.includes("Error") ||
              dialogMessage.includes("Failed") ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {dialogMessage.includes("Error") ||
              dialogMessage.includes("Failed")
                ? "Error"
                : "Success"}
            </DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
