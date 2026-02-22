export const createLeaderboardController = ({ leaderboardService }) => ({
  async getLeaderboard(_req, res) {
    try {
      const leaderboard = await leaderboardService.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error("leaderboard:get failed:", error);
      res.status(500).json({ message: "Failed to load leaderboard." });
    }
  },

  async submitSingleplayer(req, res) {
    try {
      const result = await leaderboardService.submitSingleplayerScore(req.body || {});

      if (!result.ok) {
        res.status(result.statusCode).json({ message: result.message });
        return;
      }

      res.status(200).json({ ok: true });
    } catch (error) {
      console.error("leaderboard:singleplayer failed:", error);
      res.status(500).json({ message: "Failed to save singleplayer score." });
    }
  },
});
