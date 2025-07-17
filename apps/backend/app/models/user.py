from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Numeric
from sqlalchemy.sql import func
from ..core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    auth0_id = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    bank_id = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    phone_number = Column(String)
    
    # Property information
    property_id = Column(String, unique=True, index=True)
    property_address = Column(Text)
    property_value_sek = Column(Numeric(precision=12, scale=2))
    property_verified = Column(Boolean, default=False)
    
    # NFT information
    nft_contract_address = Column(String)
    nft_token_id = Column(String)
    nft_minted = Column(Boolean, default=False)
    
    # Wallet information
    wallet_address = Column(String)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)

class Loan(Base):
    __tablename__ = "loans"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    
    # Loan details
    principal_amount = Column(Numeric(precision=18, scale=6), nullable=False)
    current_balance = Column(Numeric(precision=18, scale=6), nullable=False)
    interest_rate = Column(Numeric(precision=5, scale=4), nullable=False)  # e.g., 0.055 for 5.5%
    
    # Token information
    token_symbol = Column(String, nullable=False)  # USDC, USDT, DAI
    token_address = Column(String, nullable=False)
    chain_id = Column(Integer, nullable=False)
    chain_name = Column(String, nullable=False)
    
    # Status
    status = Column(String, default="active")  # active, paid_off, defaulted
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_interest_calculation = Column(DateTime(timezone=True), server_default=func.now())

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, index=True, nullable=False)
    user_id = Column(Integer, index=True, nullable=False)
    
    # Payment details
    amount = Column(Numeric(precision=18, scale=6), nullable=False)
    token_symbol = Column(String, nullable=False)
    token_address = Column(String, nullable=False)
    chain_id = Column(Integer, nullable=False)
    chain_name = Column(String, nullable=False)
    
    # Transaction information
    transaction_hash = Column(String, unique=True, index=True)
    block_number = Column(Integer)
    
    # Status
    status = Column(String, default="pending")  # pending, confirmed, failed
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    confirmed_at = Column(DateTime(timezone=True))
