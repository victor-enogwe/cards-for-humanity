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
        players_stats.player_id,
        players_stats.user_id,
        players_stats.total_players_joined,
        players_stats.num_spectators_joined,
        players_stats.num_players_joined,
        CASE WHEN players_stats.user_id = api_game.creator_id THEN TRUE ELSE FALSE END AS is_creator,
        CASE invite.game_id WHEN NULL THEN TRUE ELSE FALSE END AS invited
    FROM api_game
    LEFT JOIN(
        SELECT
            api_player.id as player_id,
            api_player.game_id,
            api_player.user_id,
            COUNT(*) as total_players_joined,
            COUNT(CASE api_player.spectator WHEN TRUE THEN 1 ELSE NULL END) AS num_spectators_joined,
            COUNT(CASE api_player.spectator WHEN FALSE THEN 1 ELSE NULL END) AS num_players_joined
        FROM api_player
        WHERE api_player.game_id = OLD.game_id AND api_player.id = OLD.id
        GROUP BY api_player.game_id, api_player.id, api_player.user_id
    ) AS players_stats
    ON api_game.id = players_stats.game_id
    LEFT JOIN(
        SELECT
            api_invite.game_id
        FROM api_invite
        WHERE api_invite.user_id = OLD.user_id AND api_invite.game_id = OLD.game_id
    ) invite
    ON api_game.id = invite.game_id
    WHERE api_game.id = OLD.game_id
"""

PLAYER_TRIGGER = """
    {game_summary} INTO game_summary;

    IF game_summary.status = '{game_ended}'
    THEN
        RAISE EXCEPTION 'game has ended.';
    END IF;

    IF TG_OP = 'INSERT'
    THEN
        IF game_summary.is_creator = FALSE AND game_summary.private = TRUE AND game_summary.invited = FALSE
        THEN
            RAISE EXCEPTION 'this game is private.';
        END IF;

        IF game_summary.join_ends_at >= NOW()
        THEN
            RAISE EXCEPTION 'game join period ended.';
        END IF;

        IF game_summary.num_players_joined >= game_summary.num_players
        THEN
            RAISE EXCEPTION 'maximum players for this game reached.';
        END IF;

        IF game_summary.num_spectators_joined >= game_summary.num_spectators
        THEN
            RAISE EXCEPTION 'maximum spectators for this game reached.';
        END IF;
    END IF;

    RETURN NEW;

""".format(
    game_summary=GAME_SUMMARY_SQL, game_ended=GameStatus.GE
)
