from api.utils.enums import GameStatus

GAME_SUMMARY_SQL = """
    SELECT
        api_game.id,
        api_game.creator_id,
        api_game.private,
        api_game.status,
        api_game.num_players,
        api_game.num_spectators,
        api_game.join_ends_at,
        players_stats.total_players_joined,
        players_stats.num_spectators_joined,
        players_stats.num_players_joined,
        CASE WHEN NEW.user_id = api_game.creator_id THEN TRUE ELSE FALSE END AS is_creator,
        CASE WHEN COALESCE(invite.email, '') = '' THEN FALSE ELSE TRUE END AS invited
    FROM api_game
    LEFT JOIN(
        SELECT
            api_player.game_id,
            COUNT(*) as total_players_joined,
            COUNT(CASE api_player.spectator WHEN TRUE THEN 1 ELSE NULL END) AS num_spectators_joined,
            COUNT(CASE api_player.spectator WHEN FALSE THEN 1 ELSE NULL END) AS num_players_joined
        FROM api_player
        WHERE api_player.game_id = NEW.game_id
        GROUP BY api_player.game_id
    ) AS players_stats
    ON api_game.id = players_stats.game_id
    LEFT JOIN(
        SELECT
		    api_invite.email, api_invite.game_id
		FROM api_invite
		WHERE api_invite.email IN (
			SELECT
		        api_provider.email
		    FROM api_provider
		    WHERE api_provider.user_id = NEW.user_id
		)
    ) invite
    ON invite.game_id = api_game.id
    WHERE api_game.id = NEW.game_id
"""

PLAYER_TRIGGER = """
    {game_summary} INTO game_summary;

    IF game_summary.status = '{game_ended}'
    THEN
        RAISE EXCEPTION 'game has ended.';
    END IF;

    IF TG_OP = 'INSERT'
    THEN
        IF game_summary.status != '{game_awaiting_players}'
        THEN
            RAISE EXCEPTION 'game already started.';
        END IF;

        IF game_summary.is_creator = FALSE AND game_summary.private = TRUE AND game_summary.invited = FALSE
        THEN
            RAISE EXCEPTION 'this game is private.';
        END IF;

        IF game_summary.join_ends_at <= NOW()
        THEN
            RAISE EXCEPTION 'game join period ended.';
        END IF;

        IF game_summary.num_players_joined >= game_summary.num_players
        THEN
            RAISE EXCEPTION 'maximum players for this game reached.';
        END IF;

        IF game_summary.num_spectators > 0 AND game_summary.num_spectators_joined >= game_summary.num_spectators
        THEN
            RAISE EXCEPTION 'maximum spectators for this game reached.';
        END IF;
    END IF;

    RETURN NEW;

""".format(
    game_summary=GAME_SUMMARY_SQL,
    game_ended=GameStatus.GE,
    game_awaiting_players=GameStatus.GAP,
)

INVITE_TRIGGER = """
    SELECT
        api_game.id,
        api_game.creator_id,
        api_game.status,
        api_game.num_players,
        api_game.num_spectators,
        api_game.join_ends_at,
        invite_stats.total_invites_sent,
        invite_stats.num_spectators_invited,
        invite_stats.num_players_invited,
        CASE WHEN (SELECT user_id FROM api_provider WHERE email = NEW.email) = api_game.creator_id THEN TRUE ELSE FALSE END AS is_creator
    FROM api_game
    LEFT JOIN(
        SELECT
            api_invite.game_id,
            api_invite.revoked,
            COUNT(*) as total_invites_sent,
            COUNT(CASE api_invite.spectator WHEN TRUE THEN 1 ELSE NULL END) AS num_spectators_invited,
            COUNT(CASE api_invite.spectator WHEN FALSE THEN 1 ELSE NULL END) AS num_players_invited
        FROM api_invite
        WHERE api_invite.game_id = NEW.game_id AND api_invite.revoked = FALSE
        GROUP BY api_invite.game_id, api_invite.revoked
    ) AS invite_stats
    ON api_game.id = invite_stats.game_id
    WHERE api_game.id = NEW.game_id
    INTO game_summary;

    IF game_summary.status = '{game_ended}'
    THEN
        RAISE EXCEPTION 'game has ended.';
    END IF;

    IF game_summary.status != '{game_awaiting_players}'
    THEN
        RAISE EXCEPTION 'game already started.';
    END IF;

    IF game_summary.is_creator = TRUE
    THEN
        RAISE EXCEPTION 'duplicate game creator invite.';
    END IF;

    IF game_summary.join_ends_at <= NOW()
    THEN
        RAISE EXCEPTION 'cannot invite players. game join period ended.';
    END IF;

    IF game_summary.num_spectators > 0 AND game_summary.num_spectators_invited >= game_summary.num_spectators
    THEN
        RAISE EXCEPTION 'maximum spectator invites for this game reached. remove someone.';
    END IF;

    RETURN NEW;
""".format(
    game_ended=GameStatus.GE,
    game_awaiting_players=GameStatus.GAP,
)
