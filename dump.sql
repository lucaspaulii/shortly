--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: authentication; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.authentication (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL
);


--
-- Name: authentication_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.authentication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: authentication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.authentication_id_seq OWNED BY public.authentication.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone NOT NULL
);


--
-- Name: usersUrls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."usersUrls" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "urlId" integer NOT NULL
);


--
-- Name: usersUrls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."usersUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usersUrls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."usersUrls_id_seq" OWNED BY public."usersUrls".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: authentication id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authentication ALTER COLUMN id SET DEFAULT nextval('public.authentication_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usersUrls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls" ALTER COLUMN id SET DEFAULT nextval('public."usersUrls_id_seq"'::regclass);


--
-- Data for Name: authentication; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.authentication VALUES (1, 1, '6b80a014-ee70-4571-93f1-674d87bf84f7');
INSERT INTO public.authentication VALUES (2, 2, 'f4fa6983-75a0-434e-9ba3-6476d48d3e70');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (9, 'https://stackoverflow.com/questions/33438489/error-function-coalersebigint-integer-does-not-exist', 'kV9zUUfO', 5, '2022-12-23 00:00:00');
INSERT INTO public.urls VALUES (8, 'https://docs.singlestore.com/managed-service/en/reference/sql-reference/json-functions/json_agg.html', 'QWVOw1qO', 3, '2022-12-23 00:00:00');
INSERT INTO public.urls VALUES (7, 'https://learn.microsoft.com/pt-br/sql/t-sql/language-elements/coalesce-transact-sql?view=sql-server-ver16', 'hJ66KyTz', 4, '2022-12-23 00:00:00');
INSERT INTO public.urls VALUES (10, 'https://www.notion.so/bootcampra/Projeto-Shortly-API-3ef2afe78c254d069f862c036efa6f04', '1o-F5O_o', 1, '2022-12-23 00:00:00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'icantgetno', 'satisfaction@yeye.com', '$2b$10$v6LtRFeY3aKHT1rZV8I/p./F0yOuVvUkBiXaDXZJOl2WyB.JUnNmu', '2022-12-22 00:00:00');
INSERT INTO public.users VALUES (2, 'lerigo', 'frozen@disney.com', '$2b$10$Nh4CEAjQPt5TcIoe20v8w.xufG2gx5/j6dFkgBxSgoI5C8mf7rQWm', '2022-12-23 00:00:00');


--
-- Data for Name: usersUrls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."usersUrls" VALUES (2, 1, 7);
INSERT INTO public."usersUrls" VALUES (3, 1, 8);
INSERT INTO public."usersUrls" VALUES (4, 1, 9);
INSERT INTO public."usersUrls" VALUES (5, 2, 10);


--
-- Name: authentication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.authentication_id_seq', 2, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 10, true);


--
-- Name: usersUrls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."usersUrls_id_seq"', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: authentication authentication_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authentication
    ADD CONSTRAINT authentication_pkey PRIMARY KEY (id);


--
-- Name: authentication authentication_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authentication
    ADD CONSTRAINT authentication_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: usersUrls usersUrls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_pkey" PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: authentication authentication_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authentication
    ADD CONSTRAINT "authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: usersUrls usersUrls_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- Name: usersUrls usersUrls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

