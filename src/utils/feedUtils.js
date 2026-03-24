/**
 * Centralized logic for grouping and processing feeds.
 * Groups feeds by content ID or their own ID for specific types.
 */
export const groupFeeds = (feeds) => {
  if (!feeds || !Array.isArray(feeds)) return [];

  const grouped = feeds.reduce((acc, feed) => {
    // Determine the grouping key.
    // 1. If it's a feedPost, it stands alone unless it has contentId (though usually they are unique).
    // 2. If it's a thumbnail, shortPreview, or highlight, try to group by the underlying content.

    let contentId = null;
    if (feed.feedType === 'feedPost') {
        // For feedPosts, if they refer to a content object, use its ID.
        // Otherwise, use the feed post's own ID to keep it separate.
        contentId = (typeof feed.content === 'object' ? feed.content?._id : feed.content) || feed._id;
    } else {
        // For other types (thumbnail, shortPreview, highlight),
        // they ALMOST ALWAYS should be grouped by the content they belong to.
        contentId = (typeof feed.content === 'object' ? feed.content?._id : feed.content) || feed._id;
    }

    const existingIndex = contentId
      ? acc.findIndex((item) => {
          const itemContentId =
            (typeof item.content === 'object' ? item.content?._id : item.content) || item._id;

          // Only group if the IDs match AND (it's not a feedPost OR it's the same feedPost)
          // Actually, if we want to group feedPosts with their content's other feeds, we use contentId.
          return itemContentId === contentId;
        })
      : -1;

    if (contentId && existingIndex !== -1) {
      // Group with existing post
      const existing = acc[existingIndex];

      // Merge media arrays
      if (feed.media && Array.isArray(feed.media) && feed.media.length > 0) {
        existing.media = [...(existing.media || []), ...feed.media];
      }

      // Merge other media fields if not already present
      if (feed.highlightUrl && !existing.highlightUrl)
        existing.highlightUrl = feed.highlightUrl;
      if (feed.shortPreviewUrl && !existing.shortPreviewUrl)
        existing.shortPreviewUrl = feed.shortPreviewUrl;

      // Handle potentially different thumbnail structures
      const currentThumb = feed.thumbnail?.url || feed.thumbnail;
      const existingThumb = existing.thumbnail?.url || existing.thumbnail;
      if (currentThumb && !existingThumb) {
        existing.thumbnail = feed.thumbnail;
      }

      // Merge content details
      if (feed.content && typeof feed.content === 'object') {
        existing.content = { ...(existing.content || {}), ...feed.content };
      }

      // Keep the most recent timestamp
      if (new Date(feed.createdAt) > new Date(existing.createdAt)) {
        existing.createdAt = feed.createdAt;
      }

      // Merge all other fields that might be missing in the existing group
      Object.keys(feed).forEach(key => {
        if ((existing[key] === undefined || existing[key] === null) && feed[key] !== undefined && feed[key] !== null) {
          existing[key] = feed[key];
        }
      });

      // Ensure the feedType is updated if a more "specific" type comes in
      // e.g. if we have a thumbnail and then a highlight comes, the group could represent both.
      // But we mostly care about the content.
    } else {
      // Create new grouped entry (deep copy to avoid modifying original prop)
      acc.push(JSON.parse(JSON.stringify(feed)));
    }

    return acc;
  }, []);

  // Sort processed feeds by creation date in descending order (latest first)
  return grouped.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};
