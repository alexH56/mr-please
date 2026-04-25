export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	__InternalSupabase: {
		PostgrestVersion: '14.1';
	};
	public: {
		Tables: {
			artist: {
				Row: {
					created_at: string;
					id: string;
					image_path: string | null;
					name: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					image_path?: string | null;
					name: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					image_path?: string | null;
					name?: string;
				};
				Relationships: [];
			};
			note: {
				Row: {
					content: string;
					created_at: string;
					id: string;
					marker: string;
				};
				Insert: {
					content: string;
					created_at?: string;
					id?: string;
					marker: string;
				};
				Update: {
					content?: string;
					created_at?: string;
					id?: string;
					marker?: string;
				};
				Relationships: [];
			};
			set: {
				Row: {
					created_at: string;
					id: string;
					is_encore: boolean;
					set_number: number;
					show_id: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					is_encore?: boolean;
					set_number: number;
					show_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					is_encore?: boolean;
					set_number?: number;
					show_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_set_show_id_fkey';
						columns: ['show_id'];
						isOneToOne: false;
						referencedRelation: 'show';
						referencedColumns: ['id'];
					},
				];
			};
			show: {
				Row: {
					artist_id: string;
					artist_name: string;
					created_at: string;
					date: string;
					id: string;
					image_path: string | null;
					notes: string | null;
					showtime: string | null;
					venue_id: string;
					venue_name: string;
				};
				Insert: {
					artist_id: string;
					artist_name: string;
					created_at?: string;
					date: string;
					id?: string;
					image_path?: string | null;
					notes?: string | null;
					showtime?: string | null;
					venue_id: string;
					venue_name: string;
				};
				Update: {
					artist_id?: string;
					artist_name?: string;
					created_at?: string;
					date?: string;
					id?: string;
					image_path?: string | null;
					notes?: string | null;
					showtime?: string | null;
					venue_id?: string;
					venue_name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_show_artist_id_fkey';
						columns: ['artist_id'];
						isOneToOne: false;
						referencedRelation: 'artist';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_show_artist_name_fkey';
						columns: ['artist_name'];
						isOneToOne: false;
						referencedRelation: 'artist';
						referencedColumns: ['name'];
					},
					{
						foreignKeyName: 'public_show_venue_id_fkey';
						columns: ['venue_id'];
						isOneToOne: false;
						referencedRelation: 'venue';
						referencedColumns: ['id'];
					},
				];
			};
			show_photo: {
				Row: {
					caption: string | null;
					created_at: string;
					id: string;
					path: string;
					show_id: string;
				};
				Insert: {
					caption?: string | null;
					created_at?: string;
					id?: string;
					path: string;
					show_id: string;
				};
				Update: {
					caption?: string | null;
					created_at?: string;
					id?: string;
					path?: string;
					show_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'show_photo_show_id_fkey';
						columns: ['show_id'];
						isOneToOne: false;
						referencedRelation: 'show';
						referencedColumns: ['id'];
					},
				];
			};
			song: {
				Row: {
					artist_id: string;
					artist_name: string;
					created_at: string;
					id: string;
					title: string;
				};
				Insert: {
					artist_id: string;
					artist_name: string;
					created_at?: string;
					id?: string;
					title: string;
				};
				Update: {
					artist_id?: string;
					artist_name?: string;
					created_at?: string;
					id?: string;
					title?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_song_artist_id_fkey';
						columns: ['artist_id'];
						isOneToOne: false;
						referencedRelation: 'artist';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_song_artist_name_fkey';
						columns: ['artist_name'];
						isOneToOne: false;
						referencedRelation: 'artist';
						referencedColumns: ['name'];
					},
				];
			};
			song_set: {
				Row: {
					created_at: string;
					id: string;
					note: string | null;
					order: number;
					set_id: string;
					song_id: string;
					song_title: string;
					transition: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					note?: string | null;
					order: number;
					set_id: string;
					song_id: string;
					song_title: string;
					transition?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					note?: string | null;
					order?: number;
					set_id?: string;
					song_id?: string;
					song_title?: string;
					transition?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'public_song_set_note_fkey';
						columns: ['note'];
						isOneToOne: false;
						referencedRelation: 'note';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_song_set_set_id_fkey';
						columns: ['set_id'];
						isOneToOne: false;
						referencedRelation: 'set';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_song_set_song_id_fkey';
						columns: ['song_id'];
						isOneToOne: false;
						referencedRelation: 'song';
						referencedColumns: ['id'];
					},
				];
			};
			user: {
				Row: {
					city: string | null;
					country: string | null;
					created_at: string;
					display_name: string;
					email_address: string;
					first_name: string | null;
					id: string;
					last_name: string | null;
					state: string | null;
					zip: string | null;
				};
				Insert: {
					city?: string | null;
					country?: string | null;
					created_at?: string;
					display_name: string;
					email_address: string;
					first_name?: string | null;
					id: string;
					last_name?: string | null;
					state?: string | null;
					zip?: string | null;
				};
				Update: {
					city?: string | null;
					country?: string | null;
					created_at?: string;
					display_name?: string;
					email_address?: string;
					first_name?: string | null;
					id?: string;
					last_name?: string | null;
					state?: string | null;
					zip?: string | null;
				};
				Relationships: [];
			};
			user_show: {
				Row: {
					created_at: string;
					id: string;
					show_id: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					show_id: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					show_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_user_show_show_id_fkey';
						columns: ['show_id'];
						isOneToOne: false;
						referencedRelation: 'show';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_user_show_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'user';
						referencedColumns: ['id'];
					},
				];
			};
			venue: {
				Row: {
					address1: string;
					address2: string | null;
					city: string;
					created_at: string;
					id: string;
					name: string;
					state: string;
					zip: string;
				};
				Insert: {
					address1: string;
					address2?: string | null;
					city: string;
					created_at?: string;
					id?: string;
					name: string;
					state: string;
					zip: string;
				};
				Update: {
					address1?: string;
					address2?: string | null;
					city?: string;
					created_at?: string;
					id?: string;
					name?: string;
					state?: string;
					zip?: string;
				};
				Relationships: [];
			};
		};
		Views: Record<string, never>;
		Functions: {
			create_show_with_setlist: { Args: { payload: Json }; Returns: string };
			is_admin: { Args: Record<string, never>; Returns: boolean };
		};
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	'public'
>];

export type Tables<TableName extends keyof DefaultSchema['Tables']> =
	DefaultSchema['Tables'][TableName]['Row'];

export type TablesInsert<TableName extends keyof DefaultSchema['Tables']> =
	DefaultSchema['Tables'][TableName]['Insert'];

export type TablesUpdate<TableName extends keyof DefaultSchema['Tables']> =
	DefaultSchema['Tables'][TableName]['Update'];
