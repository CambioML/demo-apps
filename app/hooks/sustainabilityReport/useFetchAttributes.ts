import { useCallback, useEffect } from 'react';
import useSustainabilityStore from './sustainabilityReportStore';
import { getAttributes } from '@/app/actions/sustainabilityReport/getAttributes';
import { Attribute } from '@/app/types/SustainabilityReportTypes';

const useFetchAttributes = () => {
  const { addAttributes, attributes, userId } = useSustainabilityStore();

  const fetchAttributes = useCallback(async () => {
    try {
      const getAttributesResponse = await getAttributes({ userId });
      const { attributes: rawAttributes }: { attributes: Attribute[] } = getAttributesResponse;

      // Create a Set of existing attribute IDs for quick lookup
      const existingAttributeIds = new Set(attributes.map((attribute: Attribute) => attribute.id));
      // Filter out rawAttributes that already exist
      const newAttributes: Attribute[] = rawAttributes
        .filter((rawAttribute) => !existingAttributeIds.has(rawAttribute.id))
        .map((rawAttribute) => ({
          id: rawAttribute.id,
          name: rawAttribute.name,
          description: rawAttribute.description,
        }));

      if (newAttributes.length > 0) {
        console.log('Adding new attributes:', newAttributes);
        addAttributes(newAttributes);
      }
    } catch (error) {
      console.error('Error fetching or adding attributes:', error);
    }
  }, [userId, addAttributes, attributes]);

  useEffect(() => {
    fetchAttributes();
  }, []);

  return { fetchAttributes };
};

export default useFetchAttributes;
