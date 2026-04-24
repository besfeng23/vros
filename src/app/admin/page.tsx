
import { redirect } from 'next/navigation';

export default function AdminPage() {
  // TODO: Check firebase auth here
  redirect('/admin/dashboard');
}
