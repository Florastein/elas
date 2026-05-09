import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
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
const LOCAL_KEY = 'saab_orders_fallback';

function loadLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalOrders(orders: Order[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(orders));
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const usingFirestore = useRef(true);

  // Real-time Firestore listener with localStorage fallback
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
        console.warn('Firestore unavailable, using local storage:', error.message);
        usingFirestore.current = false;
        setOrders(loadLocalOrders());
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addOrder = async (data: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    if (usingFirestore.current) {
      try {
        const writePromise = addDoc(collection(db, COLLECTION), {
          ...data,
          status: 'pending' as OrderStatus,
          createdAt: serverTimestamp(),
        });
        const timeout = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Firestore write timed out')), 5000)
        );
        await Promise.race([writePromise, timeout]);
        return;
      } catch (err) {
        console.warn('Firestore write failed, falling back to local:', err);
        usingFirestore.current = false;
      }
    }

    // Local fallback
    const order: Order = {
      ...data,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => {
      const next = [order, ...prev];
      saveLocalOrders(next);
      return next;
    });
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    if (usingFirestore.current) {
      try {
        const writePromise = updateDoc(doc(db, COLLECTION, id), { status });
        const timeout = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Firestore update timed out')), 5000)
        );
        await Promise.race([writePromise, timeout]);
        return;
      } catch (err) {
        console.warn('Firestore update failed, falling back to local:', err);
        usingFirestore.current = false;
      }
    }

    // Local fallback
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === id ? { ...o, status } : o));
      saveLocalOrders(next);
      return next;
    });
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
