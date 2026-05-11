import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'rejected';

export interface Order {
  id: string;
  network: string;
  plan: string;
  price: number;
  phoneNumber: string;
  email: string;
  paymentRef: string;
  status: OrderStatus;
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  updateStatus: (id: string, status: OrderStatus) => Promise<void>;
}

const OrderContext = createContext<OrderState | null>(null);

const COLLECTION = 'orders';

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time Firestore listener
  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => {
          const data = d.data();
          const createdAt =
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toISOString()
              : data.createdAt || new Date().toISOString();

          return {
            id: d.id,
            network: data.network,
            plan: data.plan,
            price: data.price,
            phoneNumber: data.phoneNumber,
            email: data.email || '',
            paymentRef: data.paymentRef || '',
            status: data.status as OrderStatus,
            createdAt,
          } satisfies Order;
        });

        setOrders(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addOrder = async (data: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, COLLECTION), {
        ...data,
        status: 'pending' as OrderStatus,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Failed to add order:', err);
      throw err;
    }
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      await updateDoc(doc(db, COLLECTION, id), { status });
    } catch (err) {
      console.error('Failed to update order status:', err);
      throw err;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, loading, addOrder, updateStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
}
