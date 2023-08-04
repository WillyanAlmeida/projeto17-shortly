--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

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
-- Name: shortly; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortly (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "createdBy" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL
);


--
-- Name: public.shortly_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.shortly_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.shortly_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.shortly_id_seq" OWNED BY public.shortly.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: public.users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.users_id_seq" OWNED BY public.users.id;


--
-- Name: shortly id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortly ALTER COLUMN id SET DEFAULT nextval('public."public.shortly_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public."public.users_id_seq"'::regclass);


--
-- Data for Name: shortly; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shortly VALUES (1, 'https://gooodle.com', 'b8HdJ4ajW2kMffbdPNskU', '2023-08-04 11:28:57.184777-03', 6, 0);
INSERT INTO public.shortly VALUES (2, 'https://gooogle.com', 'Nh-dKccek3X-Q4vhK4w_y', '2023-08-04 11:31:05.76252-03', 6, 0);
INSERT INTO public.shortly VALUES (3, 'https://gooogle1.com', 'yRCf_jtiScnJAvxj1VbLG', '2023-08-04 11:34:07.622-03', 6, 0);
INSERT INTO public.shortly VALUES (4, 'https://gooogle2.com', 'aCdfbs9INzQ-vCwnmuVSJ', '2023-08-04 11:37:03.191751-03', 6, 0);
INSERT INTO public.shortly VALUES (5, 'https://gooogle3.com', 'T3kESUJNxhylEqMeppSaD', '2023-08-04 12:48:19.924201-03', 6, 0);
INSERT INTO public.shortly VALUES (6, 'https://gooogle4.com', 'q3JGugsTrFbbzJI94D1oY', '2023-08-04 13:12:27.103732-03', 6, 0);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Benício Reis', 'Yango_Saraiva@hotmail.com', '$2b$10$vKYqnNkfh/UBgOR6QeR7ieSoFGDtIVHt3LJFV137GEsi4xLnlWHXO', NULL);
INSERT INTO public.users VALUES (2, 'willyan', 'willyan@willyan.com.br', '$2b$10$XznCpc1FjkXd2OMBqZzTOel647.DjVf0gwTw/7PACB5FnBHI4n1GW', '2023-08-03 16:02:08.912136');
INSERT INTO public.users VALUES (3, 'João Melo', 'Marli_Silva70@bol.com.br', '$2b$10$amHbuZghOTqZJrw.0XJctOV/SzxsTER8aQUvXKsqTBhLr9XPEU/ei', '2023-08-03 16:20:18.067598');
INSERT INTO public.users VALUES (4, 'Srta. Heloísa Nogueira', 'Janana.Batista5@live.com', '$2b$10$y476XeNJVDeWA7aiylHfG.9To7Emt9C3mdkRneSe2p5P.s4iI7ptC', '2023-08-03 18:04:33.656422');
INSERT INTO public.users VALUES (5, 'will', 'will@will.com', '$2b$10$viN7oROwtsztAXhH/iV49.9duMEM.UvYKOmKFmMAvJELwiAsVO4v2', '2023-08-04 09:23:53.967102');
INSERT INTO public.users VALUES (6, 'willy', 'willy@willy.com', '$2b$10$pxYBzkcNoWM2//uqlghYiOqAsFGLLI7kh35sGKDVdVzWrZmIsCPzu', '2023-08-04 09:25:01.554649');


--
-- Name: public.shortly_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.shortly_id_seq"', 6, true);


--
-- Name: public.users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.users_id_seq"', 6, true);


--
-- Name: users public.users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "public.users_email_key" UNIQUE (email);


--
-- Name: shortly shortly_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortly
    ADD CONSTRAINT shortly_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: shortly shortly_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortly
    ADD CONSTRAINT shortly_fk0 FOREIGN KEY ("createdBy") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

